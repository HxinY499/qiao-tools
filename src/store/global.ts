import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const useGlobalStore = defineStore('global', () => {
  const router = useRouter();
  const routes = router.getRoutes();

  const keepAliveComponents = reactive(
    routes
      .map(r => (r.meta?.KeepAlive ? r.name : null))
      .filter(Boolean) as string[]
  );

  return { keepAliveComponents };
});

export default useGlobalStore;
