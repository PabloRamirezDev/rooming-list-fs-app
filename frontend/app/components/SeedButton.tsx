import { useEvents } from "../context/EventsContext";
import { useMutation } from "../hooks/useMutation";
import { Button } from "./Button";
import { Spinner } from "./Spinner";

export const SeedButton = () => {
  const { refresh } = useEvents();

  const { mutate: seed, isLoading } = useMutation("/api/seed", refresh);

  const handleClick = () => {
    seed();
  };

  return (
    <>
      <Button
        type="secondary"
        onClick={handleClick}
        className="w-full relative"
        loading={isLoading}
      >
        Insert Bookings and Rooming Lists
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </Button>
    </>
  );
};
