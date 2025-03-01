
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Download, Edit, Trash2 } from "lucide-react";

interface SavedCV {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  cv_data: any;
  template_id: string;
}

const Profile = () => {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedCVs();
  }, []);

  const fetchSavedCVs = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("saved_cvs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedCVs(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching saved CVs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cv: SavedCV) => {
    navigate(`/edit/${cv.id}`, { 
      state: { 
        formData: cv.cv_data,
        templateId: cv.template_id 
      } 
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_cvs")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setSavedCVs(savedCVs.filter(cv => cv.id !== id));
      
      toast({
        title: "CV deleted",
        description: "The CV has been removed from your saved CVs.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete CV",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600">
            View and manage your saved CVs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Saved CVs</h2>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="bg-accent text-white hover:bg-accent/90"
            >
              Create New CV
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading your saved CVs...</div>
          ) : savedCVs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You don't have any saved CVs yet.</p>
              <Button
                onClick={() => navigate("/")}
                variant="link"
                className="mt-2 text-accent"
              >
                Create your first CV
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedCVs.map((cv) => (
                <div
                  key={cv.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{cv.name || "Unnamed CV"}</h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(cv.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(cv)}
                      title="Edit CV"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cv.id)}
                      title="Delete CV"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
