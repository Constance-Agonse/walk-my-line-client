import React from 'react'
import { Link } from "react-router-dom";

export default function MyOwnJournies() {
  return (
    <div>
      {/* On va mapper sur tout l'array de journey qu'on aura */}
      <Link to="./journey"> A journey (for now) </Link>
    </div>
  )
}
