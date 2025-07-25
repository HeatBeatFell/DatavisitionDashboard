module.exports = {
  apps: [
    {
      name: 'homagchina-dashboard',
      script: 'cmd.exe',
      args: '/c node_modules\\.bin\\next.cmd start --port 3000 --hostname 0.0.0.0',
      cwd: './',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1024M',
      env: {
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=1024"
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
}