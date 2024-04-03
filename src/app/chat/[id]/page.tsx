import React from "react";

export default function ChatIDPage({ params }: { params: { id: string } }) {
  return <div>Chat's ID : {params.id}</div>;
}
