# Uprising Video System

A minimalist, high-performance video automation system designed to streamline video production workflows from conception to publishing.

## Description

The Uprising Video System provides a comprehensive, unified solution for managing and automating video content creation. Built for creators and agencies, it connects the dots between ideas, scripts, assets, and final production. 

Key capabilities include:
- **Centralized Dashboard**: A unified overview of all ongoing video projects, recent activities, and key metrics.
- **Content Ingestion**: Automated pipelines for pulling in data, articles, or trends to serve as raw material for video concepts.
- **AI-Powered Script Generation**: Leveraging Google's Generative AI (`@google/generative-ai`) to transform rough ideas or ingested content into structured, ready-to-produce video scripts.
- **Asset Library**: A streamlined interface for storing, tagging, and retrieving video and audio assets quickly.
- **Performance Analytics**: Real-time insights into video performance, audience retention, and engagement metrics (intended for future integration).

By automating repetitive tasks and providing a clean, distraction-free workspace, this system allows creators to focus on the creative aspects of video production.

## Documentation

For internal documentation and information on how to configure or run the project, please refer to the `docs/` directory:
- `docs/project.md` - Core vision and feature outline.
- `docs/installation.md` - Setup and running instructions.
- `docs/gemini.md` - Details on AI model integration.
- `docs/agents.md` - Information about specific automation agents.

## Technical Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Framer Motion
- **Backend & Database**: Supabase (PostgreSQL, Auth, Storage)
- **AI Integration**: Google Generative AI SDK
- **Language**: TypeScript throughout the stack

## License

MIT
