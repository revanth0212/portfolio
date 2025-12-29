---
title: "Getting Started with React Hooks"
date: "2024-01-15"
readTime: "5 min read"
excerpt: "Learn how to use React Hooks to write cleaner and more maintainable code."
---

# Getting Started with React Hooks

React Hooks have revolutionized the way we write React components. They allow you to use state and other React features without writing a class.

## Why Hooks?

Before Hooks, you had to use class components for stateful logic. This led to complex components with duplicated logic between lifecycle methods.

## useState Hook

The `useState` hook lets you add state to functional components:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## useEffect Hook

The `useEffect` hook lets you perform side effects in functional components:

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## Custom Hooks

You can extract component logic into reusable custom hooks:

```javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

## Conclusion

React Hooks make it easier to reuse stateful logic between components and help organize your code better. Start using them in your projects today!
