---
tags:
  - bridge
  - service
  - FEATURE
---
# Message Bridge

## Purpose

The **Message Bridge** provides a communication layer between the Angular UI and the Obsidian plugin runtime. Since Angular runs inside a WebView and the plugin business logic executes in the Obsidian (Electron) runtime, they cannot directly invoke one another. The bridge provides a structured, type-safe message interface between the two.

---

## Why It Exists

- Decouple UI from business logic.
    
- Keep Angular focused on presentation.
    
- Centralize application logic in the plugin runtime.
    
- Enable future expansion without changing UI implementation.
    
- Maintain a clean, testable architecture.
    

---

## High-Level Flow

```text
Angular UI
      │
      ▼
BridgeController (Router)
      │
      ▼
BridgeService (Business Logic)
```

Responses travel back through the bridge to update the UI.

---

## MVC Responsibilities

### Controller

- Receives bridge messages.
    
- Validates requests.
    
- Routes requests to the appropriate service.
    

### Service

- Implements business logic.
    
- Coordinates multiple components.
    
- Contains application workflows.
    

### Repository

- Reads and writes plugin data.
    
- Abstracts Obsidian APIs and persistence.
    
- Provides a consistent data access layer.
    

### View

- Angular components.
    
- Displays data.
    
- Sends user actions through the bridge.
    

---

## Supporting Components

### Properties

Stores application constants and configurable values.

Examples:

- Message names
    
- Default settings
    
- Feature flags
    

---

### Configuration

Initializes and wires bridge components together.

Responsibilities include:

- Registering message handlers
    
- Loading configuration
    
- Creating singleton services
    

---

## Design Philosophy

The bridge follows a simplified **Spring Boot-inspired** architecture:

- Controllers handle requests.
    
- Services own business logic.
    
- Repositories manage data access.
    
- Configuration performs application wiring.
    
- Properties centralize configuration.
    
- Views remain presentation-only.
    

This separation keeps each component focused on a single responsibility while making the plugin easier to maintain, test, and extend.

---

## Benefits

- Loose coupling
    
- Clear separation of concerns
    
- Reusable business logic
    
- Scalable feature development
    
- Easier testing
    
- Consistent architecture across the plugin