import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useKeepAliveRoutes() {
  const router = useRouter();
  const routes = router.getRoutes();

  const keepAliveComponents = ref<string[]>([]);

  keepAliveComponents.value = routes
    .map(r => (r.meta?.KeepAlive ? r.name : null))
    .filter(Boolean) as string[];

  return keepAliveComponents;
}
