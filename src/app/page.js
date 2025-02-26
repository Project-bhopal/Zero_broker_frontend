import HomePage from "@/components/home/HomePage";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Zero broker",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <HomePage />
    </Wrapper>
  );
}
