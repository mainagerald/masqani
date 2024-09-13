package com.masqani.masqani.dto.listingInfoDto;

import com.masqani.masqani.valueObjects.DescriptionVo;
import com.masqani.masqani.valueObjects.TitleVo;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RentalDescriptionDto {
    @NotNull private TitleVo title;
    @NotNull private DescriptionVo description;
}