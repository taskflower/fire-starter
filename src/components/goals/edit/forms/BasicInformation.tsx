// src/components/newgoals/BasicInformation.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { useGoalStore } from "@/store/useGoalStore";
import { OnCompleteAction } from "@/types/goals";

export function BasicInformation() {
  const {
    title,
    description,
    onCompleteAction,
    setTitle,
    setDescription,
    setOnCompleteAction,
  } = useGoalStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Goal Name</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter goal name..."
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter goal description..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>On Complete Action</Label>
          <Select
            value={onCompleteAction.type}
            onValueChange={(value) => {
              if (value === "redirect") {
                setOnCompleteAction({
                  type: value as OnCompleteAction["type"],
                  redirectPath: "",
                });
              } else {
                setOnCompleteAction({
                  type: value as OnCompleteAction["type"],
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Do nothing</SelectItem>
              <SelectItem value="redirect">Redirect</SelectItem>
              <SelectItem value="summary">Show Summary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {onCompleteAction.type === "redirect" && (
          <div>
            <Label htmlFor="redirectPath">Redirect Path</Label>
            <Input
              id="redirectPath"
              value={onCompleteAction.redirectPath || ""}
              onChange={(e) =>
                setOnCompleteAction({
                  ...onCompleteAction,
                  redirectPath: e.target.value,
                })
              }
              placeholder="/path/to/redirect"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
