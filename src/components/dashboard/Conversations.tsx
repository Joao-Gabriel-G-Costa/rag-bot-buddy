import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageSquare, 
  Clock, 
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Download,
  Filter
} from "lucide-react";

export const Conversations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock conversation data
  const conversations = [
    {
      id: 1,
      user: "+55 11 99999-9999",
      lastMessage: "Obrigado pela ajuda!",
      timestamp: "2 min atrás",
      status: "completed",
      rating: "positive"
    },
    {
      id: 2,
      user: "+55 21 88888-8888",
      lastMessage: "Preciso de mais informações sobre preços",
      timestamp: "15 min atrás",
      status: "active",
      rating: null
    },
    {
      id: 3,
      user: "+55 11 77777-7777",
      lastMessage: "O bot não conseguiu me ajudar",
      timestamp: "1 hora atrás",
      status: "escalated",
      rating: "negative"
    }
  ];

  const selectedConversation = {
    id: 1,
    user: "+55 11 99999-9999",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Olá, gostaria de saber sobre os produtos disponíveis",
        timestamp: "14:30"
      },
      {
        id: 2,
        sender: "bot",
        content: "Olá! Temos uma variedade de produtos. Você está procurando algo específico? Posso te ajudar com informações sobre nossas categorias: eletrônicos, roupas, casa e jardim.",
        timestamp: "14:30"
      },
      {
        id: 3,
        sender: "user",
        content: "Estou interessado em eletrônicos, especificamente smartphones",
        timestamp: "14:31"
      },
      {
        id: 4,
        sender: "bot",
        content: "Ótima escolha! Temos smartphones das principais marcas. Nosso catálogo inclui modelos de entrada, intermediários e premium. Qual seria sua faixa de preço preferida?",
        timestamp: "14:31"
      },
      {
        id: 5,
        sender: "user",
        content: "Obrigado pela ajuda!",
        timestamp: "14:35"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversation List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversas Recentes</CardTitle>
            <CardDescription>
              {conversations.length} conversas ativas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {conversation.user}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Badge 
                          variant={
                            conversation.status === "completed" ? "default" :
                            conversation.status === "active" ? "secondary" :
                            "destructive"
                          }
                          className="text-xs"
                        >
                          {conversation.status === "completed" ? "Concluída" :
                           conversation.status === "active" ? "Ativa" :
                           "Escalada"}
                        </Badge>
                        {conversation.rating === "positive" && (
                          <ThumbsUp className="h-3 w-3 text-green-500" />
                        )}
                        {conversation.rating === "negative" && (
                          <ThumbsDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Detail */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Conversa com {selectedConversation.user}</span>
            </CardTitle>
            <CardDescription>
              Histórico completo da conversa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      )}
                      {message.sender === "user" && (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.sender === "bot" ? "Bot" : "Usuário"}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Avaliar esta conversa:
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Boa
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Inadequada
                    </Button>
                  </div>
                </div>
                <Badge variant="default">Concluída</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Total hoje</p>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Ativas agora</p>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-muted-foreground">Satisfação</p>
              </div>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1.2s</p>
                <p className="text-xs text-muted-foreground">Tempo médio</p>
              </div>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};