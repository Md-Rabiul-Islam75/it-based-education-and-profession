import React from 'react'
import { useLocation } from 'react-router';

export default function PorblemSolvingDetails() {
    const location = useLocation();
  const category = location.state?.category;
  console.log(category);

  return (
    <div>
      
    </div>
  )
}
