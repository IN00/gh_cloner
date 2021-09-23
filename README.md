# gh_cloner

## Installation

```
yarn add typescript ts-node @types/node
vim gh_cloner_repo_list.json
```

[gh_cloner_repo_list.json]
```json
{
  "srcDirPrefix": "gem",
  "repos": [
    "rails-api/active_model_serializers",
    "rubygems/bundler"
  ]
}
```

```
yarn ts-node path/to/bin/gh_cloner.ts
```

result after run is below.

[result]
```
.
├── active_model_serializers
│   └── gem_src
├── bundler
|    └── gem_src
├── gh_cloner_repo_list.json
```
