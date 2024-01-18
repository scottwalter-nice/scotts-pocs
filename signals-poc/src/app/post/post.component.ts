import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute, signal, effect, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  private readonly http = inject(HttpClient);

  // postId = input<number>(300);
  // postId = input<number, unknown>(300, {transform: numberAttribute});
  postId = input.required<number, unknown>({transform: numberAttribute});

  postIdComputed = computed(() => {
    console.log('computed postId', this.postId());
    return this.postId() * 2;
  });


  constructor() {
    effect(() => console.log('effect postId', this.postId()));
  }

  post = toSignal(
    toObservable(this.postId).pipe(
      tap((id) => console.log('tap id', id)),
      filter((id) => !!id), // this is necessary because initially postId will be null
      switchMap((id) =>
        this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      )
    )
  );
}




