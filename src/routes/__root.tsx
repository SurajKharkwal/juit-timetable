import { Outlet, createRootRoute } from '@tanstack/react-router'
import DefaultLayout from '@/layouts'
import { Provider } from '@/components/provider'

export const Route = createRootRoute({
  component: () => (
    <Provider themeProps={{ attribute: "class", defaultTheme: "system" }}>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </Provider>
  ),
})
