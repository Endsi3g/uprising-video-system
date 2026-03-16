# Next Steps

1. **Authentication & OAuth**: Set up Auth (e.g. Supabase Auth) to manage user sessions and securely store OAuth tokens for Google (Drive, YouTube) and Instagram.
2. **Backend API Integration**: Replace the `TODO` stubs in `src/app/api/` routes by wiring them up with the completed service libraries (`lib/youtube.ts`, `lib/gemini.ts`, `lib/instagram.ts`, etc.).
3. **Database Connection**: Connect the frontend to the actual Supabase instance, run the initial migration (`supabase/migrations/001_initial.sql`), and verify data fetching.
4. **Opus Clip & Workflows**: Finalize the background polling or webhook mechanism for Opus Clip processing status.
5. **Real Data Testing**: Ingest a real YouTube video and run it through the Gemini script generation pipeline to validate prompt quality and the REGAIN framework logic.
