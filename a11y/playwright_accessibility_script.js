const { chromium } = require("playwright");
const fs = require("fs").promises;

async function highlightFocusableElements(page) {
  await page.addStyleTag({
    content: `
        .focusable {
          outline: 5px solid red !important;
          outline-offset: 1px !important;
        }
      `,
  });

  // Assign the focusable class to all focusable elements
  await page.evaluate(() => {
    const focusableSelectors = [
      "input",
      "button",
      "select",
      "textarea",
      "a[href]",
      "area[href]",
      "iframe",
      "object",
      "embed",
      "[tabindex]",
      '[contenteditable="true"]',
    ];

    focusableSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.classList.add("focusable");
      });
    });
  });

  await page.screenshot({
    path: "screenshot.png",
    fullPage: true,
  });
}

async function getDOMNodeInfo(backendDOMNodeId) {
  if (!backendDOMNodeId) return null;

  try {
    // Get the DOM node using the backend DOM node ID
    const domNode = await cdpSession.send("DOM.describeNode", {
      backendNodeId: backendDOMNodeId,
    });

    return {
      nodeName: domNode.node.nodeName,
      nodeType: domNode.node.nodeType,
      nodeValue: domNode.node.nodeValue,
      localName: domNode.node.localName,
      attributes: domNode.node.attributes || [],
      outerHTML: await getDOMNodeHTML(domNode.node.nodeId),
    };
  } catch (error) {
    console.warn(
      `Failed to get DOM node for backend ID ${backendDOMNodeId}:`,
      error.message,
    );
    return null;
  }
}

// Function to get the outer HTML of a DOM node
async function getDOMNodeHTML(nodeId) {
  try {
    const result = await cdpSession.send("DOM.getOuterHTML", { nodeId });
    return result.outerHTML;
  } catch (error) {
    return null;
  }
}

async function getAccessibilityTree() {
  let browser;

  try {
    browser = await chromium.launch({
      headless: false, // Set to true if you don't want to see the browser
      args: ["--remote-debugging-port=9222"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const url = "http://na1.dev.nice-incontact.com";
    await page.goto(url, {
      timeout: 30000,
    });

    await page.waitForSelector("#btnNext", {
      state: "visible",
      timeout: 30000, // 30 second timeout
    });

    await highlightFocusableElements(page);

    const cdpSession = await page.context().newCDPSession(page);

    await cdpSession.send("Accessibility.enable");
    await cdpSession.send("DOM.enable");

    console.log("Retrieving accessibility tree...");
    const accessibilityTree = await cdpSession.send(
      "Accessibility.getFullAXTree",
      {
        depth: -1, // Get full tree depth
      },
    );

    console.log(
      `Retrieved accessibility tree with ${accessibilityTree.nodes.length} nodes`,
    );

    // Process nodes and get corresponding DOM information
    console.log("Matching accessibility nodes with DOM nodes...");
    const processedNodes = [];

    for (let i = 0; i < accessibilityTree.nodes.length; i++) {
      const node = accessibilityTree.nodes[i];

      if (i % 50 === 0) {
        console.log(
          `Processing node ${i + 1}/${accessibilityTree.nodes.length}`,
        );
      }

      const domInfo = await getDOMNodeInfo(node.backendDOMNodeId);

      processedNodes.push({
        nodeId: node.nodeId,
        ignored: node.ignored,
        role: node.role?.value || "unknown",
        name: node.name?.value || "",
        description: node.description?.value || "",
        value: node.value?.value || "",
        properties:
          node.properties?.map((prop) => ({
            name: prop.name,
            value: prop.value?.value || prop.value,
          })) || [],
        childIds: node.childIds || [],
        parentId: node.parentId,
        backendDOMNodeId: node.backendDOMNodeId,
        domNode: domInfo,
      });
    }

    // Process and clean the data for better readability
    const processedTree = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      nodeCount: processedNodes.length,
      nodes: processedNodes,
    };

    // Save to file
    const filename = `accessibility-tree-${Date.now()}.json`;
    await fs.writeFile(filename, JSON.stringify(processedTree, null, 2));
    console.log(`Accessibility tree saved to ${filename}`);

    // Print summary
    console.log("\n=== Accessibility Tree Summary ===");
    console.log(`Total nodes: ${processedTree.nodeCount}`);

    // Count nodes by role
    const roleCounts = {};
    processedTree.nodes.forEach((node) => {
      const role = node.role || "unknown";
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    console.log("\nNodes by role:");
    Object.entries(roleCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10) // Top 10 most common roles
      .forEach(([role, count]) => {
        console.log(`  ${role}: ${count}`);
      });

    // Show some example nodes with their DOM counterparts
    console.log("\nExample accessibility nodes with DOM info:");
    const nodesWithDOMInfo = processedTree.nodes
      .filter((node) => node.name && node.domNode && node.domNode.nodeName)
      .slice(0, 5);

    nodesWithDOMInfo.forEach((node) => {
      console.log(`\n  Accessibility: ${node.role} - "${node.name}"`);
      console.log(`  DOM: <${node.domNode.nodeName.toLowerCase()}>`);
      if (node.domNode.attributes && node.domNode.attributes.length > 0) {
        const attrs = [];
        for (let i = 0; i < node.domNode.attributes.length; i += 2) {
          attrs.push(
            `${node.domNode.attributes[i]}="${node.domNode.attributes[i + 1]}"`,
          );
        }
        console.log(
          `  Attributes: ${attrs.slice(0, 3).join(", ")}${attrs.length > 3 ? "..." : ""}`,
        );
      }
    });

    // Show statistics about DOM node matching
    const nodesWithDOM = processedTree.nodes.filter(
      (node) => node.domNode,
    ).length;
    const nodesWithoutDOM = processedTree.nodes.length - nodesWithDOM;

    console.log("\n=== DOM Matching Statistics ===");
    console.log(`Nodes with DOM info: ${nodesWithDOM}`);
    console.log(`Nodes without DOM info: ${nodesWithoutDOM}`);
    console.log(
      `Match rate: ${((nodesWithDOM / processedTree.nodes.length) * 100).toFixed(1)}%`,
    );

    return processedTree;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
if (require.main === module) {
  getAccessibilityTree()
    .then(() => {
      console.log("\nScript completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Script failed:", error);
      process.exit(1);
    });
}

module.exports = { getAccessibilityTree };
