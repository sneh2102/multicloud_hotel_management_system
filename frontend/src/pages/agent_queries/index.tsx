import { useEffect, useState } from "react";
import { Query, getAgentQueries } from "../../api/queriesApi";
import { Link } from "react-router-dom";
import { getUser } from "../../api/authApis";
import { useAuth } from "../../context/Auth";

/**
 * Author: Ketul Patel
 * This component list all queries related agent based on agentId
 * @returns
 */
export const AgentQueries = () => {
  const [agentQueries, setAgentQueries] = useState<Array<Query>>([]);

  const { getSession } = useAuth();

  const [agentId, setAgentId] = useState<number | undefined>(undefined);

  const fetchUserDetails = async () => {
    try {
      const session = await getSession();
      const email = session.getIdToken().payload.email;

      const data = await getUser(email);
      setAgentId(data.data.userId);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const _init = async () => {
      if (agentId) {
        setAgentQueries((await getAgentQueries(agentId)).data);
      }
    };
    if (agentId) {
      _init();
    }
  }, [agentId]);

  return (
    <div>
      <h1>Agent queries</h1>
      <div className='flex flex-col w-full mt-3 px-2 items-center justify-center'>
        <div className='h-[1px] w-[80%] bg-black' />
        <div className='flex w-[80%] justify-between'>
          <h3 className='max-w-8'>Id</h3>
          <h3 className='max-w-32'>Description</h3>
          <h3 className='max-w-32'>Date</h3>
          <h3 className='max-w-32'>Customer</h3>
          <h3 className='max-w-32'>Action</h3>
        </div>
        <div className='h-[1px] w-[80%] bg-black' />
        {agentQueries?.map((item, index) => (
          <div
            className='flex w-[80%]  justify-between rounded-md my-2 px-2 bg-slate-200 z-20 shadow-md'
            key={index}
          >
            <h5 className='max-w-8'>{item.id}</h5>
            <h5 className='max-w-32'>{item.description || "-"}</h5>
            <h5 className='max-w-32'>{item.date || "-"}</h5>
            <h5 className='max-w-32'>{item.customerId || "-"}</h5>
            <Link
              to={
                "/messaging/" +
                item.customerId +
                "/" +
                item.agentId +
                "/" +
                item.bookingId
              }
            >
              <h5 className='max-w-32 cursor-pointer underline'>Open Chat</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
