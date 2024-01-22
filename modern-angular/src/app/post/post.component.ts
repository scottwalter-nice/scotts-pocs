import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute, signal, effect, computed, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE, untracked, Input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
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

  postId = input.required<number, unknown>({transform: numberAttribute, alias: 'id' });
  @Input() message = '';

  internalPostId = signal(0);

  postIdComputed = computed(() => {
    console.log('computed postId', this.internalPostId());
    return this.internalPostId() * 2;
  });

  constructor() {
    effect(() => {
      console.log('effect postId', this.postId())

      untracked(() => {
        this.internalPostId.set(this.postId());
      });

    });
  }

  post = this.showPost();

  showPost() {
    return toSignal(
      toObservable(this.internalPostId).pipe(
        tap((id) => console.log('tap id', id)),
        filter((id) => !!id), // this is necessary because initially postId will be null
        switchMap((id) =>
          this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        )
      )
    , { initialValue: null }
    );
  }

  randomPost() {
    //Random number between 1 and 20
    this.internalPostId.set(Math.floor(Math.random() * 20) + 1);
  }
}
