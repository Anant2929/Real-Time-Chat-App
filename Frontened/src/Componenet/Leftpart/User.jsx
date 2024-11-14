import React from "react";
import Users from "./Users";
import useFetchFriend from "./Fetchfriend";

export default function User() {
  const { friend, loading } = useFetchFriend();

  if (loading) return <p>Loading...</p>;
  if (!friend || friend.length === 0) return <p>No friends found</p>;

  return (
    <div className="flex flex-col">
    <h1 className="px-8 py-2 text-white bg-slate-800 rounded-md font-semibold">
      Messages
    </h1>
    <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 10vh)" }}>
      {friend.map((user) => (
        <Users 
          user={user} 
          key={user._id}
        />
      ))}
    </div>
  </div>
  );
}

