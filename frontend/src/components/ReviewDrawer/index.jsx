import React from "react";
import { Drawer, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ReviewCard from "../ReviewCard";

const ReviewDrawer = ({ opened, onClose, reviews }) => {
  const isMobileView = useMediaQuery("(max-width: 768px)");

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Reviews"
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{
        transition: "rotate-left",
        duration: 150,
        timingFunction: "linear",
      }}
      size={isMobileView ? "100%" : "lg"}
    >
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review._id} />;
      })}
    </Drawer>
  );
};

export default ReviewDrawer;
