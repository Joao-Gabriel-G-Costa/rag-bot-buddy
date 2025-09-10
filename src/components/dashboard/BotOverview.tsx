import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Activity,
  Users
} from "lucide-react";

interface BotOverviewProps {
  botStatus: "online" | "offline";
}

export const BotOverview = ({ botStatus }: BotOverviewProps) => {
  // Mock data - will be replaced with real data from backend
  const stats = {
    totalConversations: 247,
    activeToday: 23,
    successRate: 89,
    avgResponseTime: 1.2,
    topicsToday: ["Suporte Técnico", "Produtos", "Preços", "Agendamento"]
  };

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversas Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeToday}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Conversas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              Desde o início
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}s</div>
            <p className="text-xs text-muted-foreground">
              Tempo de resposta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade das Últimas 24h</CardTitle>
            <CardDescription>
              Volume de mensagens por hora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between space-x-1">
              {[3, 7, 12, 8, 15, 23, 18, 25, 19, 14, 12, 9, 6, 4, 8, 11, 16, 20, 24, 18, 13, 9, 5, 2].map((value, index) => (
                <div
                  key={index}
                  className="bg-primary opacity-70 rounded-t-sm flex-1"
                  style={{ height: `${(value / 25) * 100}%` }}
                  title={`${value} mensagens às ${index}h`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tópicos Mais Frequentes</CardTitle>
            <CardDescription>
              Principais assuntos abordados hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topicsToday.map((topic, index) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topic}</span>
                  <Badge variant="secondary">{Math.floor(Math.random() * 20) + 5}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bot Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Status do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${botStatus === "online" ? "bg-green-500" : "bg-red-500"}`} />
              <div>
                <p className="text-sm font-medium">Bot WhatsApp</p>
                <p className="text-xs text-muted-foreground">
                  {botStatus === "online" ? "Conectado" : "Desconectado"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">OpenAI API</p>
                <p className="text-xs text-muted-foreground">Conectado</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Base de Dados</p>
                <p className="text-xs text-muted-foreground">Operacional</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};