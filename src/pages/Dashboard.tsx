import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Settings, 
  Database,
  FileText,
  Activity,
  Play,
  Pause
} from "lucide-react";
import { BotOverview } from "@/components/dashboard/BotOverview";
import { KnowledgeBase } from "@/components/dashboard/KnowledgeBase";
import { BotConfiguration } from "@/components/dashboard/BotConfiguration";
import { Conversations } from "@/components/dashboard/Conversations";

const Dashboard = () => {
  const [botStatus, setBotStatus] = useState<"online" | "offline">("offline");

  const toggleBotStatus = () => {
    setBotStatus(prev => prev === "online" ? "offline" : "online");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">RAG Bot Buddy</h1>
              </div>
              <Badge 
                variant={botStatus === "online" ? "default" : "secondary"}
                className="ml-4"
              >
                {botStatus === "online" ? "Online" : "Offline"}
              </Badge>
            </div>
            <Button
              onClick={toggleBotStatus}
              variant={botStatus === "online" ? "destructive" : "default"}
              className="flex items-center space-x-2"
            >
              {botStatus === "online" ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Parar Bot</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Iniciar Bot</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Base de Conhecimento</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Conversas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BotOverview botStatus={botStatus} />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>

          <TabsContent value="config">
            <BotConfiguration />
          </TabsContent>

          <TabsContent value="conversations">
            <Conversations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;