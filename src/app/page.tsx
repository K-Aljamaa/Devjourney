"use client";
// import { useEffect, useState } from 'react'
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      {posts?.map((post) => (
        <div>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
