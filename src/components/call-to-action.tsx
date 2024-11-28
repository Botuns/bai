import { Button } from "@/components/ui/button";

export function CallToAction({
  openModal,
}: {
  openModal: (type: string) => void;
}) {
  return (
    <section className="bg-[#F5F5F5] rounded-3xl p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to save on what you want?
      </h2>
      <p className="text-lg mb-8 text-muted-foreground">
        Join now and start finding the best deals tailored for you.
      </p>
      <Button size="lg" onClick={() => openModal("signup")}>
        Start Saving Now
      </Button>
    </section>
  );
}
