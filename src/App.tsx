import { EmojiGridTest } from "./components/EmojiGridTest";
import emojiGridRockets from "./assets/emoji-grid-rockets.png";

function App() {
  return (
    <div className="App">
      {/* <BackdropCanvas emojis={["🌈", "🦄", "🍕"]} /> */}
      {/* <EmojiNoiseTextureGrid emoji={"🎉"} /> */}
      {/* <EmojiNoiseTextureGrid emoji={"™️"} /> */}
      <EmojiGridTest />

      <div className="p-10">
        <div className="relative mx-auto text-center text-white w-full bg-transparent p-20 rounded-md overflow-hidden">
          <div
            className="absolute inset-0 -z-10 animated-background"
            style={{
              backgroundImage: `url(${emojiGridRockets})`,
              opacity: 0.75,
            }}
          ></div>
          <h1 className="text-4xl font-bold text-center mt-20">
            Emoji Noise Texture Grid Generator
          </h1>
          <p className="text-center mt-4 ">
            This is a simple tool to generate a grid of emojis with a noise
            texture effect. You can customize the grid to just make noise, or
            tune the emoji/text's size, rotation, and noise intensity.
          </p>
          <p>
            Inspired from the noise i saw at:{" "}
            <a
              href="https://zed.dev/blog/zed-ai"
              target="_blank"
              className="text-blue-500 underline"
            >
              https://zed.dev/blog/zed-ai
            </a>
          </p>
          <p>
            {" "}
            Brought to you by the folks at{" "}
            <a
              href="https://palomaparties.com/?utm_source=emoji-noise-texture-grid&utm_medium=referral"
              target="_blank"
              className="text-blue-500 underline"
            >
              Paloma Parties.
            </a>
          </p>
          <p>
            Github:{" "}
            <a
              href="https://github.com/mobob/emoji-noise-maker/"
              target="_blank"
              className="text-blue-500 underline"
            >
              https://github.com/mobob/emoji-noise-maker/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
