import BaseForm from "@/components/test-forms/BaseForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <section className="flex flex-col items-center pt-4 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <h1>Tanstacky things</h1>
      <p>And form things too</p>
      <div className="w-full max-w-md py-8 px-8 sm:px-0">
        <BaseForm />
      </div>
    </section>
  );
}
