#!/bin/sh
sleep 10

echo "🚀 Starting Vambe API..."

run_command() {
    echo "📋 Running: $1"
    if eval "$1"; then
        echo "✅ Success: $1"
    else
        echo "⚠️  Command failed but continuing: $1"
    fi
}

echo "🔄 Running create database..."
run_command "npm run db:create"

echo "🔄 Running migrations..."
run_command "npm run db:migrate"

# Start the application
echo "🚀 Starting NestJS application..."
# Use production start in Docker environment
exec npm run start:prod
