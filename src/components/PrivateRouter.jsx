"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import auth from '@/firebase/config';
function PrivateRouter({children}) {
   const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const adminEmail = 'hdrss.in@gmail.com';
        setIsAdmin(user.email === adminEmail);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAdmin) {
    return <p className='pt-24 text-4xl font-bold text-center'>Access denied</p>;
  }
  else {
        return <>{children}</>;

  }
};


export default PrivateRouter