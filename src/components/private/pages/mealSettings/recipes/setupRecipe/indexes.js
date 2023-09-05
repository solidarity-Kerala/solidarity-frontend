import React, { useRef, forwardRef } from "react";

// Functional component wrapped with React.forwardRef
const MyComponent = forwardRef((props, ref) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 25 },
  ];
  return (
    <div ref={ref}>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MyComponent;
