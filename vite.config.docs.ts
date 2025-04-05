import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { Readable } from 'stream';
import { defineConfig } from 'vite';
import busboy, { FileInfo } from 'busboy';

export default defineConfig({
  base: `./`,
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  plugins: [
    vue(),
    {
      name: 'mock-post-endpoint',
      configureServer(server) {
        server.middlewares.use('/', (req, res, next) => {
          if (req.method === 'POST') {
            const bb = busboy({ headers: req.headers });
            let fileInfo: FileInfo;

            bb.on('file', (name, stream: Readable, info: FileInfo) => {
              fileInfo = info;

              stream.on('data', (chunk) => {
                // console.log(`Load ${chunk.length} bytes`);
              });

              stream.on('end', () => {
                console.log('file stream done');
              });
            });
            
            bb.on('error', (error) => {
              console.error(error);
            });

            bb.on('finish', () => {
              res.setHeader('Content-Type', 'application/json');

              if (fileInfo.mimeType.startsWith('image/')) {
                res.end(JSON.stringify({ url: 'https://picsum.photos/800/600?format=.jpg' }));
              } else {
                res.end(JSON.stringify({ url: './' + fileInfo.filename }));
              }
            });

            req.pipe(bb);

            // req.on('end', () => {
            //   res.setHeader('Content-Type', 'application/json');
            //
            //   if (file.type.startsWith('image/')) {
            //     res.end(JSON.stringify({ url: 'https://picsum.photos/800/600?format=.jpg' }));
            //   } else {
            //     res.end(JSON.stringify({ url: './' + file.name }));
            //   }
            // });
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    outDir: 'docs',
  },
});
