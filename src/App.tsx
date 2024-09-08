import { BackdropCanvas } from "./components/BackdropCanvas";
import { EmojiGridTest } from "./components/EmojiGridTest";
import EmojiNoiseTextureGrid from "./components/EmojiNoiseTextureGrid";

function App() {
  return (
    <div className="App">
      {/* <BackdropCanvas emojis={["🌈", "🦄", "🍕"]} /> */}
      {/* <EmojiNoiseTextureGrid emoji={"🎉"} /> */}
      {/* <EmojiNoiseTextureGrid emoji={"™️"} /> */}
      <EmojiGridTest />
      <h1 className="text-4xl font-bold text-center mt-20">
        Vite + React + Tailwind Backdrop
      </h1>
    </div>
  );
}

export default App;
