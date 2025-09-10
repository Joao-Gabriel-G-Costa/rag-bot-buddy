import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Link, 
  Search,
  Trash2,
  RefreshCw,
  Plus
} from "lucide-react";

export const KnowledgeBase = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [documents] = useState([
    { id: 1, name: "Manual do Usuário.pdf", type: "PDF", size: "2.5 MB", status: "Processado" },
    { id: 2, name: "FAQ Produtos", type: "Texto", size: "1.2 MB", status: "Processado" },
    { id: 3, name: "Política de Preços", type: "DOCX", size: "800 KB", status: "Processando" },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsProcessing(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setUploadProgress(0);
        }
      }, 200);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="faq">FAQ Manual</TabsTrigger>
          <TabsTrigger value="urls">URLs/Websites</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Upload de Documentos</CardTitle>
                <CardDescription>
                  Carregue arquivos PDF, DOCX ou TXT para a base de conhecimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                    <p className="text-xs text-muted-foreground">
                      Suporta PDF, DOCX, TXT (máx. 10MB por arquivo)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processando...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button className="w-full" disabled={isProcessing}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Treinar Bot com Novos Documentos
                </Button>
              </CardContent>
            </Card>

            {/* Document List */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos na Base</CardTitle>
                <CardDescription>
                  Gerencie os documentos processados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "Processado" ? "default" : "secondary"}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Manual</CardTitle>
              <CardDescription>
                Adicione perguntas e respostas específicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Pergunta</label>
                  <Input placeholder="Ex: Como fazer um pedido?" />
                </div>
                <div>
                  <label className="text-sm font-medium">Resposta</label>
                  <Textarea 
                    placeholder="Para fazer um pedido, acesse nosso site..."
                    rows={4}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar FAQ
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">FAQs Existentes</h4>
                {[
                  { question: "Como fazer um pedido?", answer: "Para fazer um pedido, acesse nosso site..." },
                  { question: "Qual o prazo de entrega?", answer: "O prazo varia de 3 a 7 dias úteis..." },
                ].map((faq, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{faq.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urls">
          <Card>
            <CardHeader>
              <CardTitle>URLs e Websites</CardTitle>
              <CardDescription>
                Adicione URLs para extrair conteúdo automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input placeholder="https://exemplo.com/pagina" className="flex-1" />
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar URL
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { url: "https://empresa.com/sobre", status: "Processado" },
                  { url: "https://empresa.com/produtos", status: "Processando" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.url}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.status === "Processado" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Search Knowledge Base */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar na Base de Conhecimento</CardTitle>
          <CardDescription>
            Teste o que o bot sabe sobre um tópico específico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Digite sua pergunta..." className="flex-1" />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};