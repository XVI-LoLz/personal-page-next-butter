import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useScrollToHashOnLoad() {
  const router = useRouter();
  useEffect(() => {
    const [_, hash] = router.asPath.split("#");
    if (hash) {
      router.replace(`#${hash}`);
    }
  }, []);
}
