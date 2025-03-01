import InfoBox from "@/lib/components/InfoBox";
import SearchBar from "@/lib/components/SearchBar";

export default function Home() {
  return (
    <div className="font-inter flex flex-col gap-8 justify-center items-center h-screen">
      <div className="flex flex-row -mt-60 gap-36">
        <div className="flex flex-col gap-4 self-start">
          <div className="flex flex-row gap-4 text-[200px] font-bold mt-24">
            <h1
              className="relative w-fit font-inter text-7xl
before:absolute before:inset-0 before:animate-typewriter
before:bg-white
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
after:bg-black text-5xl font-bold [--steps:18]"
            >
              Welcome to Quartz.
            </h1>{" "}
          </div>
          <div className="w-[800px]">
            <SearchBar />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InfoBox
            title="Add an Issue"
            content="Add references, code, and notes to your Quartz journal."
            link="/"
          />
          <InfoBox
            title="Guide"
            content="How to use Quartz + all of our features."
            link="/"
          />
          <InfoBox
            title="Your Profile"
            content="Configure your settings and make your dev journal yours."
            link="/"
          />
          <InfoBox
            title="Track Your Work"
            content="See what you've been working on."
            link="/"
          />
        </div>
      </div>
    </div>
  );
}
