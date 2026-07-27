---
status: Work in Progress
tags:
  - WIP
  - Draft
---
# BrainScan 🧠
## Software Requirements Specification (SRS)

> **Purpose:** BrainScan is an Obsidian plugin for transforming a knowledge vault into a structured, context-aware knowledge graph. This document serves as the project's living design document and source of truth.

---

## 🤔 Problem Statement 
---
> _"Knowledge exists only in relation."_  
	**— Gregory Bateson**
---

Modern methods of evaluating technical knowledge rely heavily on resumes, interviews, certifications, and professional networking platforms; all of which provide only fragmented, inaccurate or indirect evidence of an individual's actual understanding or proficiency. These current solutions not only have been subject to the typical signal corruptions of, *"Good Hart's Law"*; but also have been behind some of the greatest short coming in the process of professional understanding, leading to BILLIONS of dollars in wasted productivity and lost revenues. 

These methods are susceptible to bias, optimization, and incomplete representations of knowledge, making it difficult to accurately demonstrate expertise or understand how a person's knowledge is connected and applied. I seek to mediate and further reduce these methods as valid means of aptitude in place of a more realistic way of showcasing capability and understanding. I look to do this through my own understating of the following fields of study . . . 

- Epistemology 
- Ontology 
- Sociology
- Contextual Engineering
- Machine Learning

BrainScan addresses this problem by transforming an Obsidian vault (Current Chosen Medium) into a structured, context-aware knowledge graph that represents knowledge as an interconnected system rather than a collection of isolated documents. Through standardized metadata, taxonomy enforcement, contextual relationship discovery, and local AI analysis, BrainScan provides a foundation for authentic, transparent, and evolving knowledge representation. 

This project is the first step toward a future where technical knowledge can be explored, understood, and evaluated through the structure, depth, and context of what a person knows, rather than solely through traditional credentials or interviews.

## Overview

### Vision

Create a local-first knowledge platform that scans an Obsidian vault, understands relationships between notes, and generates a rich contextual graph for visualization, search, AI interaction, and publishing. Allow users to have a workflow that uses AI to create a interactive knowledge experience. 


## How it works 🔩
---


### Goals

- [ ] Generate a contextual knowledge graph.
- [ ] Enforce consistent vault organization.
- [ ] Improve knowledge discovery through context.
- [ ] Integrate local AI for analysis and automation.
- [ ] Export structured data for external applications.

## Non-Goals

- Replace Obsidian.
- Depend on cloud AI services.
- Become a general-purpose graph database.

---

# 2. Project Architecture

## Design Philosophy

BrainScan follows:

- **MVC Architecture**
- **Java Spring Boot-inspired structure**
  - Properties
  - Configurations
  - Controllers
  - Services
- **Feature (Domain) Organized Repository**
  - Each feature contains its own controllers, services, models, configuration, and supporting files.
  - This allows a Enterprise style of workflow that tightly couples functionality but balances consumption and availability of computational instances
  - This project is not built using Java to there will be work arounds for things like Services and Beans which makes the Dependency Injection Paradigm easy to use.

The project emphasizes high cohesion, balanced coupling, and feature ownership.

---

# 3. Core Features

## Vault Scanner

Indexes notes, links, tags, frontmatter, and attachments.

## Context Engine

Builds semantic relationships between notes beyond explicit links.

## Taxonomy Engine

Manages controlled vocabularies, categories, aliases, and hierarchical knowledge organization.

## Metadata Engine

Defines, validates, and enforces standardized frontmatter schemas.

## Rubric Engine

Defines reusable validation rules and quality standards for notes and reports violations.

## Knowledge Graph

Generates an internal graph model representing contextual relationships.

## Local AI Integration

Supports local LLMs through:

- Ollama
- LM Studio

Used for:

- Classification
- Tag suggestions
- Metadata generation
- Relationship discovery
- Context summarization

## Export Engine

Produces versioned JSON and other formats for external visualization or publishing.

---

# 4. Functional Requirements

- Scan vault contents.
- Maintain an internal knowledge graph.
- Enforce metadata standards.
- Enforce taxonomy consistency.
- Validate notes against configurable rubrics.
- Analyze notes using local AI.
- Export graph data.
- Provide configurable plugin settings.

---

# 5. Non-Functional Requirements

- Local-first
- Offline capable
- Extensible
- Modular
- High performance
- Maintainable
- Privacy focused

---

# 6. Repository Structure

```text
src/
└── features/
    ├── scanner/
    ├── context/
    ├── taxonomy/
    ├── metadata/
    ├── rubric/
    ├── ai/
    ├── graph/
    ├── export/
    └── settings/
```

Each feature encapsulates its own domain logic following the MVC + Service architecture.

---

# 7. Development Roadmap

## Phase 1

- Plugin framework
- Vault scanning
- Metadata enforcement

## Phase 2

- Taxonomy engine
- Context engine
- Knowledge graph

## Phase 3

- AI integration
- Rubric validation
- Export engine

## Phase 4

- Visualization
- Publishing
- Performance optimization

---

# 8. References

- Obsidian Plugin API
- TypeScript Handbook
- Electron Documentation
- Java Spring Boot Architecture
- MVC Design Pattern