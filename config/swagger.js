const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "API - Meus Links",
    "description": "API para gerenciar links de usuários",
    "version": "1.0.1"
  },
   
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Autenticação de usuário",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": ["email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Autenticação bem-sucedida",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Credenciais inválidas"
          }
        }
      }
    },
    "/auth/forgot_password": {
      "post": {
        "summary": "Solicitar redefinição de senha",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  }
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Solicitação de redefinição de senha enviada"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/auth/reset_password": {
      "post": {
        "summary": "Redefinir senha",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "token": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": ["token", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Senha redefinida com sucesso"
          },
          "401": {
            "description": "Token inválido"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/users": {
      "post": {
        "summary": "Registrar novo usuário",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string",
                    "minLength": 7
                  }
                },
                "required": ["name", "email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuário registrado com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "409": {
            "description": "Email já cadastrado"
          }
        }
      },
      "get": {
        "summary": "Listar usuários",
        "responses": {
          "200": {
            "description": "Lista de usuários",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string",
                        "format": "email"
                      },
                      "createdAt": {
                        "type": "string",
                        "format": "date-time"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/users/{user_id}": {
      "get": {
        "summary": "Obter usuário por ID",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário encontrado",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string",
                      "format": "email"
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },
      "put": {
        "summary": "Atualizar usuário por ID",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string",
                    "minLength": 7
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuário atualizado com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },
      "delete": {
        "summary": "Excluir usuário por ID",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário excluído com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/users/{user_id}/links": {
      "get": {
        "summary": "Obter links do usuário",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de links do usuário",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "title": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      },
                      "imageUrl": {
                        "type": "string"
                      },
                      "isPublic": {
                        "type": "boolean"
                      },
                      "userId": {
                        "type": "string"
                      },
                      "createdAt": {
                        "type": "string",
                        "format": "date-time"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },
      "post": {
        "summary": "Criar novo link para o usuário",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "imageUrl": {
                    "type": "string"
                  },
                  "isPublic": {
                    "type": "boolean"
                  },
                  "userId": {
                    "type": "string"
                  }
                },
                "required": ["title", "url", "userId"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Link criado com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },
      "put": {
        "summary": "Atualizar link por ID",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "link_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "imageUrl": {
                    "type": "string"
                  },
                  "isPublic": {
                    "type": "boolean"
                  },
                  "userId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Link atualizado com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário ou link não encontrado"
          }
        }
      }
    },
    "/users/{user_id}/links/{link_id}": {
      "get": {
        "summary": "Obter link por ID",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "link_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Link encontrado",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "imageUrl": {
                      "type": "string"
                    },
                    "isPublic": {
                      "type": "boolean"
                    },
                    "userId": {
                      "type": "string"
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário ou link não encontrado"
          }
        }
      },
      "put": {
        "summary": "Atualizar link por ID",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "link_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "imageUrl": {
                    "type": "string"
                  },
                  "isPublic": {
                    "type": "boolean"
                  },
                  "userId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Link atualizado com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário ou link não encontrado"
          }
        }
      },
      "delete": {
        "summary": "Excluir link por ID",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "link_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Link excluído com sucesso"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Usuário ou link não encontrado"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}

module.exports = swaggerDocument;
