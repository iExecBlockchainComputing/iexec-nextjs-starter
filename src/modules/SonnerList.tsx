import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SoonerList() {
  const showSonner1 = () => {
    toast("A basic notification.");
  };
  const showSonner2 = () => {
    toast.error("Event has not been created");
  };
  const showSonner3 = () => {
    toast.success("Event has been created");
  };
  const showSonner4 = () => {
    toast.warning("T'es sur de toi ?");
  };
  const showSonner5 = () => {
    toast.success("MacOs successful delete", {
      action: {
        label: "Undo please",
        onClick: () => console.log('non'),
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={showSonner1}>
        Show sonner notification
      </Button>
      <Button variant="outline" onClick={showSonner2}>
        Show sonner error
      </Button>
      <Button variant="outline" onClick={showSonner3}>
        Show sonner success
      </Button>
      <Button variant="outline" onClick={showSonner4}>
        Show sonner warning
      </Button>
      <Button variant="outline" onClick={showSonner5}>
        Show sonner with option ?
      </Button>
    </div>
  );
}
