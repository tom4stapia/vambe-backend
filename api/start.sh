#!/bin/sh
sleep 10

echo "🚀 Starting Vambe API..."

run_command() {
    echo "📋 Running: $1"
    if $1; then
        echo "✅ Success: $1"
    else
        echo "⚠️  Command failed but continuing: $1"
    fi
}


run_command "npm run db:drop"

echo "🔄 Running create database..."
run_command "npm run db:create"

echo "🔄 Running migrations..."
run_command "npm run db:migrate"

echo "🔄 Running seeders..."
run_command "npm run db:seed"

echo "🚀 Starting development server..."
npm run dev
