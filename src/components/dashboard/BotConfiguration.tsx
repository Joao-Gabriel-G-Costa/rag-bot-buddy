import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  MessageSquare, 
  Brain, 
  AlertTriangle,
  Save,
  TestTube
} from "lucide-react";

export const BotConfiguration = () => {
  const [apiKey, setApiKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([500]);
  const [botPersona, setBotPersona] = useState("Você é um assistente virtual amigável e prestativo da nossa empresa.");
  const [fallbackMessage, setFallbackMessage] = useState("Desculpe, não consegui encontrar uma resposta para sua pergunta. Pode tentar reformular ou entrar em contato com nosso atendimento humano?");

  const validateApiKey = () => {
    // Simulate API key validation
    if (apiKey.startsWith("sk-") && apiKey.length > 20) {
      setIsKeyValid(true);
    } else {
      setIsKeyValid(false);
    }
  };

  const testBot = () => {
    // Simulate bot testing
    console.log("Testing bot configuration...");
  };

  return (
    <div className="space-y-6">
      {/* OpenAI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Configuração OpenAI</span>
          </CardTitle>
          <CardDescription>
            Configure sua chave de API e parâmetros do modelo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">Chave da API OpenAI</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={validateApiKey} variant="outline">
                Validar
              </Button>
            </div>
            {apiKey && (
              <div className="mt-2">
                <Badge variant={isKeyValid ? "default" : "destructive"}>
                  {isKeyValid ? "Chave válida" : "Chave inválida"}
                </Badge>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Temperatura: {temperature[0]}</Label>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={1}
                min={0}
                step={0.1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Controla a criatividade das respostas (0 = preciso, 1 = criativo)
              </p>
            </div>

            <div>
              <Label>Máximo de Tokens: {maxTokens[0]}</Label>
              <Slider
                value={maxTokens}
                onValueChange={setMaxTokens}
                max={1000}
                min={100}
                step={50}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tamanho máximo das respostas geradas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bot Persona */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Personalidade do Bot</span>
          </CardTitle>
          <CardDescription>
            Defina como o bot deve se comportar e responder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="persona">Prompt de Sistema</Label>
            <Textarea
              id="persona"
              value={botPersona}
              onChange={(e) => setBotPersona(e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Descreva como o bot deve se comportar..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Este texto define a personalidade e o comportamento do bot
            </p>
          </div>

          <div>
            <Label htmlFor="fallback">Mensagem de Fallback</Label>
            <Textarea
              id="fallback"
              value={fallbackMessage}
              onChange={(e) => setFallbackMessage(e.target.value)}
              rows={3}
              className="mt-1"
              placeholder="Mensagem quando o bot não souber responder..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Exibida quando o bot não encontra uma resposta adequada
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Configurações Avançadas</span>
          </CardTitle>
          <CardDescription>
            Opções adicionais para o comportamento do bot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Busca Semântica</Label>
              <p className="text-sm text-muted-foreground">
                Ativar busca por similaridade na base de conhecimento
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Histórico de Contexto</Label>
              <p className="text-sm text-muted-foreground">
                Manter contexto das últimas mensagens da conversa
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Filtro de Conteúdo</Label>
              <p className="text-sm text-muted-foreground">
                Filtrar conteúdo inapropriado automaticamente
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Logs Detalhados</Label>
              <p className="text-sm text-muted-foreground">
                Registrar logs detalhados para debug
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={testBot} variant="outline" className="flex items-center space-x-2">
          <TestTube className="h-4 w-4" />
          <span>Testar Configuração</span>
        </Button>
        <Button className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Salvar Configurações</span>
        </Button>
      </div>

      {/* Warning */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Atenção: Configurações de Segurança
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Suas chaves de API são armazenadas de forma segura e criptografada. Nunca compartilhe suas chaves publicamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};