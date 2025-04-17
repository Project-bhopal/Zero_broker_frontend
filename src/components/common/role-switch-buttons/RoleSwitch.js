'use client';
import { ApiPutRequest } from '@/axios/apiRequest';
import useAxiosPost from '@/hooks/useAxiosPost';
import { useState } from 'react';

export default function RoleSwitch({role}) {
  const [selectedRole, setSelectedRole] = useState(role);

  const roles = ['seller', 'buyer'];

  
  const handleRoleChange = async (role) => {
    setSelectedRole(role);
    const response  = await ApiPutRequest(`/auth/change-role`);
    if(response.status == 200){
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex w-64 bg-white rounded-full p-1"
      style={{
        boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.06)'
      }}
      >
        {/* Sliding Highlight */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#0f8363] transition-all duration-300 ${
            selectedRole === 'seller' ? 'left-1' : 'left-1/2'
          }`}
        ></div>

        {/* Seller Button */}
        <button
          onClick={() => handleRoleChange('seller')}
          className={`w-1/2 z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            selectedRole === 'seller'
              ? 'text-white'
              : 'text-[#0f8363] '
          }`}
        >
          Seller
        </button>

        {/* Buyer Button */}
        <button
          onClick={() => handleRoleChange('buyer')}
          className={`w-1/2 z-10 text-sm font-semibold rounded-full transition-colors duration-300 ${
            selectedRole === 'buyer'
              ? 'text-white'
              : 'text-[#0f8363]'
          }`}
        >
          Buyer
        </button>
      </div>
    </div>
  );
}
