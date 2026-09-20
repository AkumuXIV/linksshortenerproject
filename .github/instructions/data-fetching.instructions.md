---
description: Read this file to understand how to fetch data in this project.
applyTo: '**/*.ts', '**/*.tsx'
---

# Data Fetching Guidelines
This document outlines the best practices and guidelines for fetching data in our Next.js application.  Adhering to these guidelines will help ensure consistency, maintainability, and optimal performance across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching.  NEVER use Client Components for fetching data. 

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data.  NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.