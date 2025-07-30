import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
            <span style={{ color: "#0070f3", textDecoration: "underline" }}>Go back home</span>
        </Link>
    </div>
);

export default NotFound;