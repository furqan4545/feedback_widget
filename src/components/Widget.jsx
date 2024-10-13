import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import supabase from "@/supabaseClient";
import tailwindstyles from "../index.css?inline";

export const Widget = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to an API
    console.log("Form submitted");
    const form = e.target;
    const formData = {
      p_project_id: projectId,
      p_user_name: form.name.value,
      p_user_email: form.email.value,
      p_message: form.feedback.value,
      p_rating: rating,
    };

    const { data: returnedData, error } = await supabase.rpc(
      "add_feedback",
      formData
    );
    console.log(returnedData);
    if (error) {
      console.error(error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <>
      <style>{tailwindstyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105">
              <div className="flex items-center">
                <span className="pr-1 text-center align-middle">Feedback</span>
                <MessageCircle className="h-4 w-4" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-white shadow-lg w-[300px] p-0 mr-2">
            <style>{tailwindstyles}</style>
            {submitted ? (
              <div className="flex flex-col items-center justify-center p-4">
                <h3 className="text-lg font-medium">
                  Thank you for your feedback!
                </h3>
                <p className="text-sm text-gray-600 text-center pt-2 pb-5">
                  We appreciate your time and effort in helping us improve our
                  platform.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Submit another
                </Button>
              </div>
            ) : (
              <div className="p-4 w-full">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Send us your feedback
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Your email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Your feedback"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Rating</Label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="p-0 hover:bg-transparent"
                            onClick={() => handleRating(star)}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating >= star
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                            <span className="sr-only">{star} stars</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
