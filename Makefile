.PHONY: help setup clean

help:
	@echo ""
	@echo "🏠 play.hono"
	@echo "=============="
	@echo ""
	@echo "📦 Setup:"
	@echo "  setup     - Start project"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  clean     - Clean build files and caches"
	@echo ""

setup:
	@echo ""
	@echo "🚀 Starting project..."
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	@echo "📄 Setting up application environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ Created .env file"; \
	else \
		echo "⚠️  .env file already exists"; \
	fi
	@echo ""
	@echo "📦 Installing dependencies..."
	npm ci
	@echo ""
	@echo "⚙️ Generating Cloudflare environment..."
	npm run cloudflare:env
	@echo ""
	@echo "🔨 Building public scripts..."
	npm run build:scripts
	@echo ""
	@echo "🗄️  Building database..."
	@if [ ! -f ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/local.sqlite" ]; then \
		rm -rf .wrangler/state/v3/d1/miniflare-D1DatabaseObject/local.sqlite; \
    	yes | npx wrangler d1 migrations apply Database --local; \
	fi
	@echo ""
	@echo "🎉 Setup complete!"
	@echo ""
	@echo "📝 Next steps:"
	@echo "   1. Edit .env file with your settings"
	@echo "   2. Run npm run dev to start development"
	@echo ""

clean:
	@echo ""
	@echo "🧹 Cleaning project..."
	@echo "━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	rm -rf .next
	rm -rf .wrangler
	rm -rf .open-next
	rm -rf node_modules/.cache
	rm -rf public/scripts/*.js
	rm -f tsconfig.tsbuildinfo
	@echo "✅ Clean complete!"
	@echo ""
