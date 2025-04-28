
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(idNumber, password);
      
      if (success) {
        toast({
          title: t('auth.login'),
          description: "Logged in successfully!",
        });
        navigate("/vote");
      } else {
        toast({
          title: "Error",
          description: "Invalid ID or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="flex flex-col items-center py-12 px-4">
        <Card className="w-full max-w-md mb-8">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {t('auth.login')}
            </CardTitle>
            <CardDescription className="text-center">
              {t('app.tagline')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idNumber">{t('auth.idNumber')}</Label>
                <Input
                  id="idNumber"
                  placeholder={t('auth.enterID')}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : t('auth.login')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Test Accounts</CardTitle>
            <CardDescription>Use these credentials for testing the voting system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1234567890</TableCell>
                  <TableCell>password1</TableCell>
                  <TableCell>Alisher Usmanov</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2345678901</TableCell>
                  <TableCell>password2</TableCell>
                  <TableCell>Malika Karimova</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3456789012</TableCell>
                  <TableCell>password3</TableCell>
                  <TableCell>Jasur Irgashev</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
