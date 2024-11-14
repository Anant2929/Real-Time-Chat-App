import React from 'react'
import Chatuser from './Chatuser'
import ChatArea from './ChatArea'
import Type from './Type'
import { useParams } from 'react-router-dom'



export default function Right() {
  const { id } = useParams()
  console.log("id :",id)
  return (
    <div className="w-[70%] h-screen bg-slate-900 text-gray-50 flex flex-col">
      {id === undefined ? (
        <div className="flex items-center justify-center flex-1">
          <h1 className="text-2xl font-semibold">No User Selected</h1>
        </div>
      ) : (
        <>
          <Chatuser />
          <ChatArea />
          <Type />
        </>
      )}
    </div>
  );
}

