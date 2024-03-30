import { list } from "postcss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Error {
  isError: boolean;
  error?: { data: { message: string } };
  fallback?: () => void;
}

const useErrors = (errors: Error[] = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

type MutationHook = () => [Promise<any>, any];

const useAsyncMutation = (mutationHook: MutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage: string, ...args: any) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      const res = await mutate(...args);

      if (res.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data] as const;
};

type Socket = {
  on: (event: string, handler: (...args: any[]) => void) => void;
  off: (event: string, handler: (...args: any[]) => void) => void;
};

type Handlers = {
  [key: string]: (...args: any[]) => void;
};

const useSocketEvents = (socket: Socket, handlers: Handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };
