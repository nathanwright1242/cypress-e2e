**react-query** - provides hooks for fetching, caching and updating asynchronous data in React. This library helps remove the need for fetch / useEffect hooks for state management as it will handle caching, cache invalidation, and refetching behind the scenes.

Has two different statues:

- normal status: finished, loading, etc
- fetching status: for when it's refetching the data in the background for your application

## Getting Started

1. wrap your application w/in a query client provider:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* the flower devtools icon related to react-query */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

2. Add `useQuery(queryKey, queryFn)` - fetches the data, caches it, and returns the data. `queryKey` is just a unique identifier to represent the API query. `queryFn` is the function that fetches the data, usually fetch / axios calls and must return a promise.

They `queryKey` is used to identify the data needed for your component. For example, if another component uses the same queryKey as a different component then this component can immediately just use the cached data and react-query will refetch the data in the background. Then once it finishes refetching it will display the updated data to all components listening on this key.

```javascript
import { useQuery } from '@tanstack/react-query';
import { getPosts } from './api/posts';

export default function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: 'Initial Data' }],
  });

  if (postsQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
```

3. `useMutation` - similar to useQuery but for updating data on your API: POST / PUT requests.

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post';

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    // the mutation function that will be called
    mutationFn: createPost,
    onSuccess: (data) => {
      // important to set / cache the recently created / updated item. No need to refetch from the server when you already have everything you need
      queryClient.setQueryData(['posts', data.id], data);
      queryClient.invalidateQueries(['posts'], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    // call the mutation function
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' ref={titleRef} />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <input id='body' ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
```

## Resources

- [react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [Overview Video](https://www.youtube.com/watch?v=lVLz_ASqAio&t=0s)
- [Full Walkthrough Video](https://www.youtube.com/watch?v=r8Dg0KVnfMA)
- [Sample Source Code](https://github.com/WebDevSimplified/react-query-crash-course-example/blob/main/client/src/main.jsx)
