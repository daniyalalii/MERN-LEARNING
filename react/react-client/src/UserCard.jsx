export default function UserCard({ name, age }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
            <h3>{name}</h3>
            <p>Age: {age}</p>
        </div>
    );
}