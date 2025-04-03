import FlipCard from "@/components/FlipCard";

const Welcome = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <FlipCard
        description="You’re about to embark on a 36-hour coding marathon filled with caffeine, creativity, and a mild existential crisis at 3 AM, but loaddssss of Fun!!"
        rotate="y"
      />
    </div>
  );
};

export default Welcome;
