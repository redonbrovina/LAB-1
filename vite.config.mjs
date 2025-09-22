import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Optimize chunk splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          
          // Feature chunks
          'auth': [
            './src/client/pages/AuthPages.jsx',
            './src/client/utils/AuthContext.jsx',
            './src/client/utils/ProtectedRoute.jsx'
          ],
          'client-pages': [
            './src/client/pages/ClientPages.jsx',
            './src/client/pages/Dashboard.jsx',
            './src/client/pages/Products.jsx',
            './src/client/pages/Cart.jsx',
            './src/client/pages/Profile.jsx',
            './src/client/pages/Payments.jsx',
            './src/client/pages/PaymentMethods.jsx'
          ],
          'admin-pages': [
            './src/client/pages/AdminPages.jsx',
            './src/client/pages/AdminDashboard.jsx',
            './src/client/pages/AdminPayments.jsx',
            './src/client/pages/AdminUsers.jsx'
          ],
          'public-pages': [
            './src/client/pages/PublicPages.jsx',
            './src/client/pages/Home.jsx',
            './src/client/pages/About.jsx',
            './src/client/pages/Services.jsx'
          ]
        }
      }
    },
    // Enable source maps for better debugging
    sourcemap: true,
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Development server optimizations
  server: {
    hmr: {
      overlay: false
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ]
  }
})
